export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const { className } = props

  return <div className={'h-24 w-24 animate-spin text-8xl ' + className}>&#x21bb;</div>
}

type LoadingIndicatorProps = {
  className: string
}
