import { ReactNode } from "react";
import { MenuView } from "../Menu/MenuView";

interface LayoutViewProps {
  title: string;
  children?: ReactNode;
}

export function LayoutView({ title, children }: LayoutViewProps) {
  return (
    <section className="layout">
      <section className="header">
        <h1>{title}</h1>
        <MenuView />
      </section>
      <section className="main">{children}</section>
    </section>
  );
}
