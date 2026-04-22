import type { ChangeEvent, DragEvent, RefObject } from "react";

interface VideoUploadSectionProps {
  dragging: boolean;
  file: File | null;
  preview: string | null;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onRemoveFile: () => void;
}

export default function VideoUploadSection({
  dragging,
  file,
  preview,
  inputRef,
  onChange,
  onDrop,
  onDragLeave,
  onDragOver,
  onRemoveFile,
}: VideoUploadSectionProps) {
  if (!preview) {
    return (
      <div
        className={`flex w-full cursor-pointer flex-col items-center gap-3 rounded-3xl border border-dashed bg-panel px-6 py-12 text-center transition ${
          dragging
            ? "border-accent bg-accent-soft"
            : "border-border hover:border-accent hover:bg-[rgba(59,130,246,0.03)]"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          accept="video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={onChange}
          ref={inputRef}
          type="file"
        />

        <div className="mb-1 flex h-15 w-15 items-center justify-center rounded-2xl border border-border bg-panel-2 text-muted">
          <svg
            fill="none"
            height="36"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="36"
          >
            <rect height="14" rx="2" width="14" x="2" y="5" />
            <polyline points="16 8 22 5 22 19 16 16" />
          </svg>
        </div>

        <p className="text-sm font-semibold text-text">
          {dragging ? "여기에 파일을 놓아주세요" : "클릭하거나 영상을 끌어오세요"}
        </p>
        <p className="font-mono text-[11px] tracking-[0.08em] text-muted">MP4, WebM, MOV, 최대 200MB</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative flex max-h-[280px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-panel">
        <video
          className="block max-h-[280px] w-full object-contain"
          controls
          src={preview}
        />
        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-text backdrop-blur-md transition hover:bg-danger/70"
          onClick={onRemoveFile}
          title="제거"
          type="button"
        >
          <svg
            fill="none"
            height="14"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="14"
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-panel px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent-soft text-accent">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <rect height="14" rx="2" width="14" x="2" y="5" />
              <polyline points="16 8 22 5 22 19 16 16" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-text">{file?.name}</div>
            <div className="font-mono text-[10px] text-muted">
              {file ? (file.size / 1024 / 1024).toFixed(2) : "0.00"} MB
            </div>
          </div>

          <div className="font-mono text-[11px] whitespace-nowrap text-success">업로드 완료</div>
        </div>
      </div>
    </div>
  );
}
