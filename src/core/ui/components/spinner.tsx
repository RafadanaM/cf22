import { RiLoaderLine } from '@remixicon/react';
import { cn } from '@/core/ui/utils/index';

function Spinner({ className, ...props }: Omit<React.ComponentProps<'svg'>, 'children'>) {
  return (
    <RiLoaderLine
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
