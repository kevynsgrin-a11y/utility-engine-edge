import {
  cloneElement,
  isValidElement,
  useId,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "light";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  light: "btn-light",
};

type Base = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type NativeButton = Base &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    to?: undefined;
    href?: undefined;
  };

type RouterButton = Base & {
  to: string;
  href?: undefined;
  onClick?: () => void;
};

type AnchorButton = Base & {
  href: string;
  to?: undefined;
  onClick?: () => void;
};

export type ButtonProps = NativeButton | RouterButton | AnchorButton;

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary" } = props;
  const classes = cn("btn", variantClass[variant], className);

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </a>
    );
  }

  const { variant: _variant, ...rest } = props as NativeButton;
  void _variant;
  return (
    <button type={rest.type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}

type FieldProps = {
  id?: string;
  label: string;
  hint?: string;
  dark?: boolean;
  children: ReactNode;
};

export function Field({ id, label, hint, dark, children }: FieldProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string }>, { id: fieldId })
    : children;
  return (
    <label className="block" htmlFor={fieldId}>
      <span
        className={cn(
          "eyebrow",
          dark ? "text-brass-light" : "text-olive",
        )}
      >
        {label}
      </span>
      <span className="mt-1 block [&>*]:w-full">
        {control}
      </span>
      {hint ? (
        <span className={cn("mt-1 block text-xs", dark ? "text-ivory/55" : "text-stone")}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}
