// Acciones
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './components/button/Button';
export { IconButton, type IconButtonProps } from './components/icon-button/IconButton';

// Layout
export {
  Stack,
  Container,
  Separator,
  type StackProps,
  type ContainerProps,
  type SeparatorProps,
} from './components/layout/Layout';
export { Card, type CardProps } from './components/card/Card';

// Texto
export {
  Kbd,
  Code,
  Link,
  type KbdProps,
  type CodeProps,
  type LinkProps,
} from './components/text/Text';

// Formularios
export { Field, useFieldA11y, type FieldProps, type FieldA11y } from './components/field/Field';
export { Input, type InputProps } from './components/input/Input';
export { Textarea, type TextareaProps } from './components/textarea/Textarea';
export { Checkbox, type CheckboxProps } from './components/checkbox/Checkbox';
export { RadioGroup, type RadioGroupProps, type RadioOption } from './components/radio/RadioGroup';
export { Select, type SelectProps, type SelectOption } from './components/select/Select';
export { Switch, type SwitchProps } from './components/switch/Switch';
export { Slider, type SliderProps } from './components/slider/Slider';
export { NumberInput, type NumberInputProps } from './components/number-input/NumberInput';
export { PinInput, type PinInputProps } from './components/pin-input/PinInput';
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentOption,
} from './components/segmented/SegmentedControl';

// Datos
export { Badge, type BadgeProps, type BadgeTone } from './components/badge/Badge';
export { Chip, type ChipProps } from './components/chip/Chip';
export { Avatar, type AvatarProps } from './components/avatar/Avatar';
export {
  AvatarGroup,
  type AvatarGroupProps,
  type AvatarGroupItem,
} from './components/avatar-group/AvatarGroup';
export { Table, type TableProps, type TableColumn } from './components/table/Table';
export { Stat, type StatProps, type StatDelta } from './components/stat/Stat';

// Feedback
export { Alert, type AlertProps, type AlertTone } from './components/alert/Alert';
export { EmptyState, type EmptyStateProps } from './components/empty-state/EmptyState';
export { Progress, type ProgressProps } from './components/progress/Progress';
export { Skeleton, type SkeletonProps } from './components/skeleton/Skeleton';
export { Spinner, type SpinnerProps } from './components/spinner/Spinner';
export {
  ToastProvider,
  useToast,
  type ToastOptions,
  type ToastTone,
} from './components/toast/Toast';

// Navegación
export { Tabs, type TabsProps, type TabItem } from './components/tabs/Tabs';
export {
  Breadcrumb,
  type BreadcrumbProps,
  type BreadcrumbItem,
} from './components/breadcrumb/Breadcrumb';
export { Pagination, type PaginationProps } from './components/pagination/Pagination';

// Superficies flotantes
export { Dialog, DialogClose, type DialogProps } from './components/dialog/Dialog';
export { Drawer, DrawerClose, type DrawerProps } from './components/drawer/Drawer';
export { Menu, type MenuProps, type MenuAction } from './components/menu/Menu';
export { Popover, type PopoverProps } from './components/popover/Popover';
export { Tooltip, TooltipProvider, type TooltipProps } from './components/tooltip/Tooltip';

// Contenido
export {
  Accordion,
  type AccordionProps,
  type AccordionItem,
} from './components/accordion/Accordion';

// IA
export { StreamingText, type StreamingTextProps } from './components/streaming-text/StreamingText';
