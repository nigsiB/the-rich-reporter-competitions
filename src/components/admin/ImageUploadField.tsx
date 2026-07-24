"use client";

import { useCallback, useId, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { uploadCompetitionImageAction } from "@/app/actions/admin";
import { fieldClass, labelClass } from "@/components/formStyles";

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 5 * 1024 * 1024;

type ImageUploadFieldProps = {
  name?: string;
  initialUrl?: string;
  required?: boolean;
};

export default function ImageUploadField({
  name = "imageUrl",
  initialUrl = "",
  required = true,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(initialUrl);
  const [showUrlField, setShowUrlField] = useState(Boolean(initialUrl) && !initialUrl.includes("competition-images"));
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);

  const displaySrc = previewObjectUrl || url;

  const validateFile = (file: File): string | null => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowed.includes(file.type)) {
      return "Please choose a JPG, PNG, or WebP image.";
    }
    if (file.size > MAX_BYTES) {
      return "Image must be 5MB or smaller.";
    }
    return null;
  };

  const uploadFile = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setUploading(true);

    const localPreview = URL.createObjectURL(file);
    setPreviewObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return localPreview;
    });

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadCompetitionImageAction(formData);
    setUploading(false);

    if (!result.success || !result.data?.publicUrl) {
      setError(result.success ? "Upload failed." : result.error);
      setPreviewObjectUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      return;
    }

    setUrl(result.data.publicUrl);
    setShowUrlField(false);
  }, []);

  const onDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await uploadFile(file);
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
    e.target.value = "";
  };

  const clearImage = () => {
    setUrl("");
    setPreviewObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError("");
  };

  return (
    <div className="space-y-4 md:col-span-2">
      <div>
        <span className={labelClass}>Competition image</span>
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
            "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed px-6 py-10 text-center transition-colors",
            dragging
              ? "border-[var(--champagne)] bg-[var(--champagne)]/8"
              : "border-[var(--border)] bg-[var(--bg-deep)] hover:border-[var(--champagne)]/50",
            uploading ? "pointer-events-none opacity-70" : "",
          ].join(" ")}
        >
          {displaySrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displaySrc}
              alt="Competition preview"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
          ) : null}

          <div className="relative z-[1] space-y-3">
            <p className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--fg)]">
              {uploading ? "Uploading…" : displaySrc ? "Replace image" : "Drop image here"}
            </p>
            <p className="text-xs text-[var(--muted)]">
              or click to browse · JPG, PNG, WebP · max 5MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={onFileChange}
            disabled={uploading}
          />
        </div>

        {displaySrc ? (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="h-24 w-36 overflow-hidden border border-[var(--border)] bg-[var(--bg-deep)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={displaySrc} alt="Selected competition" className="h-full w-full object-cover" />
            </div>
            <button
              type="button"
              onClick={clearImage}
              className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-[var(--champagne)]"
            >
              Remove
            </button>
          </div>
        ) : null}

        {error ? (
          <p className="mt-3 text-sm text-red-400/90" role="alert">
            {error}
          </p>
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
          <div>
            <label htmlFor={`${inputId}-url`} className={labelClass}>
              Image URL
            </label>
            <input
              id={`${inputId}-url`}
              name={name}
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setPreviewObjectUrl((prev) => {
                  if (prev) URL.revokeObjectURL(prev);
                  return null;
                });
              }}
              className={fieldClass}
              placeholder="https://…"
              aria-required={required}
            />
          </div>
        ) : (
          <input type="hidden" name={name} value={url} />
        )}
      </div>
    </div>
  );
}
