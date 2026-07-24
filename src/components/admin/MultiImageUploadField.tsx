"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { uploadCompetitionImageAction } from "@/app/actions/admin";
import { fieldClass, labelClass } from "@/components/formStyles";

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 5 * 1024 * 1024;

type GalleryImage = {
  id: string;
  url: string;
};

type MultiImageUploadFieldProps = {
  initialMainUrl?: string;
  initialGalleryUrls?: string[];
  required?: boolean;
};

function newId() {
  return crypto.randomUUID();
}

export default function MultiImageUploadField({
  initialMainUrl = "",
  initialGalleryUrls = [],
  required = true,
}: MultiImageUploadFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<GalleryImage[]>(() => {
    const urls = [
      ...(initialMainUrl.trim() ? [initialMainUrl.trim()] : []),
      ...initialGalleryUrls.map((u) => u.trim()).filter(Boolean),
    ];
    const seen = new Set<string>();
    const unique: GalleryImage[] = [];
    for (const url of urls) {
      if (seen.has(url)) continue;
      seen.add(url);
      unique.push({ id: newId(), url });
    }
    return unique;
  });
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showUrlField, setShowUrlField] = useState(false);
  const [pasteUrl, setPasteUrl] = useState("");

  const mainUrl = images[0]?.url ?? "";
  const galleryUrls = images.slice(1).map((img) => img.url);

  const validateFile = (file: File): string | null => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowed.includes(file.type)) {
      return "Please choose a JPG, PNG, or WebP image.";
    }
    if (file.size > MAX_BYTES) {
      return "Each image must be 5MB or smaller.";
    }
    return null;
  };

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadCompetitionImageAction(formData);
    if (!result.success || !result.data?.publicUrl) {
      setError(result.success ? "Upload failed." : result.error);
      return null;
    }
    return result.data.publicUrl;
  }, []);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (!list.length) return;

      setError("");
      setUploading(true);
      const uploaded: GalleryImage[] = [];
      for (const file of list) {
        const url = await uploadFile(file);
        if (url) uploaded.push({ id: newId(), url });
      }
      setUploading(false);

      if (uploaded.length) {
        setImages((prev) => {
          const existing = new Set(prev.map((p) => p.url));
          return [...prev, ...uploaded.filter((u) => !existing.has(u.url))];
        });
      }
    },
    [uploadFile],
  );

  const onDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) await uploadFiles(e.dataTransfer.files);
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) await uploadFiles(e.target.files);
    e.target.value = "";
  };

  const setAsMain = (id: string) => {
    setImages((prev) => {
      const idx = prev.findIndex((img) => img.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      const [item] = next.splice(idx, 1);
      next.unshift(item);
      return next;
    });
  };

  const moveImage = (id: string, direction: -1 | 1) => {
    setImages((prev) => {
      const idx = prev.findIndex((img) => img.id === id);
      const target = idx + direction;
      if (idx < 0 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const addPasteUrl = () => {
    const url = pasteUrl.trim();
    if (!url) return;
    try {
      new URL(url);
    } catch {
      setError("Please enter a valid image URL.");
      return;
    }
    setError("");
    setImages((prev) => {
      if (prev.some((p) => p.url === url)) return prev;
      if (prev.length === 0) return [{ id: newId(), url }];
      return [...prev, { id: newId(), url }];
    });
    setPasteUrl("");
  };

  return (
    <div className="space-y-4 md:col-span-2">
      <div>
        <span className={labelClass}>Competition images</span>
        <p className="mb-3 text-xs leading-relaxed text-[var(--muted)]">
          Upload one or more images. The first (or marked Main) is used on cards; extras appear as a
          gallery on the competition page.
        </p>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
          onDrop={onDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={[
            "relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed px-6 py-10 text-center transition-colors",
            dragging
              ? "border-[var(--champagne)] bg-[var(--champagne)]/8"
              : "border-[var(--border)] bg-[var(--bg-deep)] hover:border-[var(--champagne)]/50",
            uploading ? "pointer-events-none opacity-70" : "",
          ].join(" ")}
        >
          <div className="relative z-[1] space-y-3">
            <p className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--fg)]">
              {uploading ? "Uploading…" : images.length ? "Add more images" : "Drop images here"}
            </p>
            <p className="text-xs text-[var(--muted)]">
              or click to browse · JPG, PNG, WebP · max 5MB each · multiple allowed
            </p>
          </div>

          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept={ACCEPT}
            multiple
            className="sr-only"
            onChange={onFileChange}
            disabled={uploading}
          />
        </div>

        {images.length > 0 ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, index) => (
              <li
                key={img.id}
                className="border border-[var(--border)] bg-[var(--bg-deep)] p-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-elevated)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                  {index === 0 ? (
                    <span className="absolute left-2 top-2 bg-[var(--champagne)] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--bg-deep)]">
                      Main
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {index !== 0 ? (
                    <button
                      type="button"
                      onClick={() => setAsMain(img.id)}
                      className="text-[9px] uppercase tracking-[0.18em] text-[var(--champagne)] transition-colors hover:text-[var(--fg)]"
                    >
                      Set main
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => moveImage(img.id, -1)}
                    disabled={index === 0}
                    className="text-[9px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)] disabled:opacity-30"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(img.id, 1)}
                    disabled={index === images.length - 1}
                    className="text-[9px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)] disabled:opacity-30"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="text-[9px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-red-400/90"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {error ? (
          <p className="mt-3 text-sm text-red-400/90" role="alert">
            {error}
          </p>
        ) : null}
        {required && !mainUrl ? (
          <p className="mt-2 text-xs text-[var(--muted)]">At least one image is required.</p>
        ) : null}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowUrlField((v) => !v)}
          className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
        >
          {showUrlField ? "Hide image URL" : "Or paste image URL"}
        </button>

        {showUrlField ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor={`${inputId}-url`} className={labelClass}>
                Image URL
              </label>
              <input
                id={`${inputId}-url`}
                type="url"
                value={pasteUrl}
                onChange={(e) => setPasteUrl(e.target.value)}
                className={fieldClass}
                placeholder="https://…"
              />
            </div>
            <button
              type="button"
              onClick={addPasteUrl}
              className="border border-[var(--border)] px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:border-[var(--champagne)]/50 hover:text-[var(--champagne)]"
            >
              Add URL
            </button>
          </div>
        ) : null}
      </div>

      <input type="hidden" name="imageUrl" value={mainUrl} />
      <input type="hidden" name="galleryUrls" value={JSON.stringify(galleryUrls)} />
    </div>
  );
}
