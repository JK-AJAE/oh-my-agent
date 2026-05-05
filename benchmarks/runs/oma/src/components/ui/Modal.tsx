"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = "" }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={[
        "fixed inset-0 z-50 m-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl",
        "backdrop:bg-black/40 backdrop:backdrop-blur-sm",
        "open:flex open:flex-col open:gap-4",
        className,
      ].join(" ")}
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div className="flex items-center justify-between">
        {title && (
          <h2 id="modal-title" className="text-xl font-bold text-gray-800">
            {title}
          </h2>
        )}
        <button
          onClick={onClose}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
}
