import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';
import { useMediaQuery } from '@/core/hooks/useMediaQuery';

interface SectionProps {
  title: string;
}

function Section({ title, children }: PropsWithChildren<SectionProps>) {
  const matches = useMediaQuery('(min-width: 48rem)');
  return (
    <motion.section
      initial={{
        y: matches ? '0%' : '100%',
        x: matches ? '-100%' : '0%',
        opacity: 0
      }}
      animate={{
        y: '0%',
        x: '0%',
        opacity: 1
      }}
      exit={{
        y: matches ? '0%' : '100%',
        x: matches ? '-100%' : '0%',
        opacity: 0
      }}
      transition={{
        type: 'tween',
        duration: 0.15
      }}
      className="fixed flex flex-col top-0 left-0 right-0 bottom-0 bg-secondary md:right-auto md:w-96 md:shadow-2xl"
    >
      <div className="p-4">
        <h2 className="text-xl text-primary font-bold">{title}</h2>
      </div>
      <div className="flex flex-col gap-3 px-2 overflow-auto">{children}</div>
    </motion.section>
  );
}

export default Section;
