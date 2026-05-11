// src/components/ui/Select.tsx — Pelicula wrapper
// Re-exports shadcn Select with our DESIGN.md tokens applied via Tailwind v4 @theme.
// shadcn select consumes CSS vars (--primary, --background, etc.) which Pelicula maps
// via DESIGN.md export.
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './shadcn-select';
