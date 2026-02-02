"use client";

import { createContext, useContext, useEffect } from "react";

import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

import {
  CategoryBadge,
  ScoreBadge,
  TierBadge,
} from "@/components/badge-components";

// ============================================================================
// Context
// ============================================================================

interface ServiceModalContextValue {
  service: Service;
  onClose?: () => void;
}

const ServiceModalContext = createContext<ServiceModalContextValue | null>(
  null,
);

const useServiceModal = () => {
  const context = useContext(ServiceModalContext);
  if (!context) {
    throw new Error(
      "ServiceModal components must be used within ServiceModal.Root",
    );
  }
  return context;
};

// ============================================================================
// Root Component
// ============================================================================

export type ServiceModalRootProps = React.ComponentProps<"div"> & {
  service: Service;
  onClose?: () => void;
  open?: boolean;
};

const ServiceModalRoot = ({
  service,
  onClose,
  open = true,
  ...props
}: ServiceModalRootProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close on ESC key
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <ServiceModalContext.Provider value={{ service, onClose }}>
      <div {...props} />
    </ServiceModalContext.Provider>
  );
};

ServiceModalRoot.displayName = "ServiceModal.Root";

// ============================================================================
// Backdrop Component
// ============================================================================

export type ServiceModalBackdropProps = React.ComponentProps<"button">;

const ServiceModalBackdrop = ({
  className,
  ...props
}: ServiceModalBackdropProps) => {
  const { onClose } = useServiceModal();

  return (
    <button
      type="button"
      data-slot="service-modal-backdrop"
      style={{
        backdropFilter: "blur(8px)",
      }}
      className={cn(
        "fixed inset-0 z-50 transition-all duration-300 border-0 p-0 cursor-default bg-black/80",
        className,
      )}
      onClick={onClose}
      aria-label="Close modal"
      {...props}
    />
  );
};

ServiceModalBackdrop.displayName = "ServiceModal.Backdrop";

// ============================================================================
// Content Component
// ============================================================================

export type ServiceModalContentProps = React.ComponentProps<"div">;

const ServiceModalContent = ({
  className,
  ...props
}: ServiceModalContentProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      data-slot="service-modal-content"
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded border",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4",
        "bg-card border-border",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      {...props}
    />
  );
};

ServiceModalContent.displayName = "ServiceModal.Content";

// ============================================================================
// Close Button Component
// ============================================================================

export type ServiceModalCloseProps = React.ComponentProps<"button">;

const ServiceModalClose = ({
  className,
  children = "[ESC]",
  ...props
}: ServiceModalCloseProps) => {
  const { onClose } = useServiceModal();

  return (
    <button
      type="button"
      data-slot="service-modal-close"
      className={cn(
        "absolute right-4 top-4 z-10 text-xs font-mono transition-colors",
        "text-muted-foreground hover:text-primary",
        className,
      )}
      onClick={onClose}
      aria-label="Close modal"
      {...props}
    >
      {children}
    </button>
  );
};

ServiceModalClose.displayName = "ServiceModal.Close";

// ============================================================================
// Header Component
// ============================================================================

export type ServiceModalHeaderProps = React.ComponentProps<"div">;

const ServiceModalHeader = ({
  className,
  children,
  ...props
}: ServiceModalHeaderProps) => {
  const { service } = useServiceModal();

  return (
    <div
      data-slot="service-modal-header"
      className={cn("border-b border-border p-6", className)}
      {...props}
    >
      {children || (
        <div className="space-y-3">
          <div className="flex items-start gap-3 flex-wrap">
            <h2
              id="service-modal-title"
              className="text-2xl font-medium tracking-tight"
            >
              {service.name}
            </h2>
            <TierBadge tier={service.tier} />
            <ScoreBadge score={service.score} />
          </div>
          <CategoryBadge category={service.category} />
          <p className="text-sm font-mono leading-relaxed text-muted-foreground">
            {service.metadata.description}
          </p>
        </div>
      )}
    </div>
  );
};

ServiceModalHeader.displayName = "ServiceModal.Header";

// ============================================================================
// Body Component
// ============================================================================

export type ServiceModalBodyProps = React.ComponentProps<"div">;

const ServiceModalBody = ({ className, ...props }: ServiceModalBodyProps) => {
  return (
    <div
      data-slot="service-modal-body"
      className={cn("p-6 space-y-8", className)}
      {...props}
    />
  );
};

ServiceModalBody.displayName = "ServiceModal.Body";

// ============================================================================
// Section Component
// ============================================================================

export type ServiceModalSectionProps = React.ComponentProps<"section"> & {
  title?: string;
  bordered?: boolean;
};

const ServiceModalSection = ({
  className,
  title,
  bordered = false,
  children,
  ...props
}: ServiceModalSectionProps) => {
  return (
    <section
      data-slot="service-modal-section"
      className={cn(bordered && "border-t border-border pt-6", className)}
      {...props}
    >
      {title && (
        <h3 className="text-xs font-mono mb-4 text-muted-foreground">
          {title}
        </h3>
      )}
      {children}
    </section>
  );
};

ServiceModalSection.displayName = "ServiceModal.Section";

// ============================================================================
// Footer Component
// ============================================================================

export type ServiceModalFooterProps = React.ComponentProps<"div">;

const ServiceModalFooter = ({
  className,
  children,
  ...props
}: ServiceModalFooterProps) => {
  const { service } = useServiceModal();

  const copyAsJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(service, null, 2));
  };

  return (
    <div
      data-slot="service-modal-footer"
      className={cn(
        "flex items-center justify-between border-t border-border pt-6",
        className,
      )}
      {...props}
    >
      {children || (
        <>
          <span className="text-xs font-mono text-muted-foreground/60">
            updated: {service.lastUpdated}
          </span>
          <button
            type="button"
            onClick={copyAsJSON}
            className={cn(
              "text-xs font-mono px-3 py-1.5 rounded border transition-colors",
              "bg-background border-border text-muted-foreground",
              "hover:border-primary hover:text-primary",
            )}
          >
            copy_json
          </button>
        </>
      )}
    </div>
  );
};

ServiceModalFooter.displayName = "ServiceModal.Footer";

// ============================================================================
// Export Namespace
// ============================================================================

export const ServiceModal = {
  Root: ServiceModalRoot,
  Backdrop: ServiceModalBackdrop,
  Content: ServiceModalContent,
  Close: ServiceModalClose,
  Header: ServiceModalHeader,
  Body: ServiceModalBody,
  Section: ServiceModalSection,
  Footer: ServiceModalFooter,
};
