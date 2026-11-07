export default function ARLogo({ className = 'h-8 w-auto', alt = 'AR Logo' }) {
  return (
    <img
      src="/images/logo.png"
      alt={alt}
      className={`object-contain select-none drop-shadow-sm ${className}`}
      loading="eager"
    />
  );
}
