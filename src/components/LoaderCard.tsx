import React, { memo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/CodeBlock';

interface LoaderCardProps {
  title: string;
  componentName: string;
  children: ReactNode;
}

export const LoaderCard = memo(({ title, componentName, children }: LoaderCardProps) => {
  const importCode = `import { ${componentName} } from 'react-loader-animate';`;
  const usageCode = `<${componentName} size="md" variant="primary" />`;

  return (
    <Card className="flex flex-col bg-card border-border hover:shadow-glow transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-sm font-semibold text-foreground font-mono">{componentName}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
      </div>

      {/* Variants preview */}
      <div className="px-5 pb-4">
        <p className="text-xs text-muted-foreground mb-2">Variants</p>
        <div className="grid grid-cols-4 gap-2">
          {(['primary', 'accent', 'success', 'warning'] as const).map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-1.5">
              <div className="h-12 flex items-center justify-center">
                {React.cloneElement(children as React.ReactElement, { variant, size: 'sm' })}
              </div>
              <span className="text-[10px] text-muted-foreground capitalize">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes preview */}
      <div className="px-5 pb-4 border-t border-border/50 pt-3">
        <p className="text-xs text-muted-foreground mb-2">Sizes</p>
        <div className="grid grid-cols-3 gap-2">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1.5">
              <div className="h-14 flex items-center justify-center">
                {React.cloneElement(children as React.ReactElement, { size })}
              </div>
              <span className="text-[10px] text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code block */}
      <div className="px-5 pb-5 border-t border-border/50 pt-3 mt-auto space-y-2">
        <CodeBlock code={importCode} />
        <CodeBlock code={usageCode} />
      </div>
    </Card>
  );
});
LoaderCard.displayName = 'LoaderCard';

