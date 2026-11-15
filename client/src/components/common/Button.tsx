import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlineLight'
  | 'ghostDark'
  | 'gold'
  | 'glow'
  | 'glowEco'
  | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  to: string;
  href?: undefined;
  onClick?: () => void;
  'aria-label'?: string;
};

type ButtonAsAnchor = BaseProps & {
  href: string;
  to?: undefined;
  onClick?: () => void;
  'aria-label'?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#20C878] text-[#050505] hover:bg-[#B9F27C] shadow-sm shadow-[#20C878]/20 font-semibold',
  secondary:
    'bg-white/5 text-white/90 border border-white/15 hover:bg-white/10 hover:border-white/30 backdrop-blur-md font-medium',
  outlineLight:
    'bg-white text-[#050505] border border-white/20 hover:bg-white/90 font-semibold',
  ghostDark:
    'bg-transparent text-white/80 hover:text-white hover:bg-white/5 font-medium',
  gold:
    'bg-[#E8C46A] text-[#050505] hover:bg-[#f0d388] font-semibold shadow-sm',
  glow:
    'bg-gradient-to-r from-[#0050FF] via-[#0080FF] to-[#00D6FF] text-white font-semibold shadow-[0_0_25px_-5px_rgba(0,214,255,0.45)] hover:shadow-[0_0_35px_-2px_rgba(0,214,255,0.65)] hover:brightness-110 border border-white/25',
  glowEco:
    'bg-gradient-to-r from-[#103D2B] to-[#20C878] text-white font-semibold shadow-[0_0_25px_-5px_rgba(32,200,120,0.35)] hover:shadow-[0_0_35px_-2px_rgba(32,200,120,0.55)] hover:brightness-110 border border-[#20C878]/40',
  glass:
    'bg-[#0A0A0C]/70 text-white/90 border border-white/10 hover:border-[#00D6FF]/40 hover:bg-[#111115]/80 backdrop-blur-lg font-medium shadow-sm',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-sm sm:text-base rounded-xl',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D6FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ('to' in props && props.to !== undefined) {
    return (
      <Link
        to={props.to}
        onClick={props.onClick}
        aria-label={props['aria-label']}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href !== undefined) {
    return (
      <a
        href={props.href}
        onClick={props.onClick}
        aria-label={props['aria-label']}
        className={classes}
      >
        {children}
      </a>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    type = 'button',
    ...buttonAttrs
  } = props;

  return (
    <button type={type} className={classes} {...buttonAttrs}>
      {children}
    </button>
  );
}
