import { type ReactNode } from "react";

interface Props {
        children: ReactNode;
        className?: string;
        id?: string;
}

export const Section = ({ className, children, id}: Props ) => {
  return (
    <section id={id} className={`lg:min-h-[47.5rem] min-h-fit h-full flex 
                         ${className}`}
    >
        {children}
    </section>
  )
}