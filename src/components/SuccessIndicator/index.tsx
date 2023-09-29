export default function SuccessIndicator(props: SuccessIndicatorProps) {
  const { className } = props

  return <div className={'h-24 w-24 animate-pulse text-8xl ' + className}>&#9989;</div>
}

type SuccessIndicatorProps = {
  className: string
}
