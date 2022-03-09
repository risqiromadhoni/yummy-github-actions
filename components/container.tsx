import { ReactNode, FC, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

const Container: FC<Props> = (props) => {
  return <div className={'container mx-auto px-5 ' + props.className}>{props.children}</div>
}

export default Container
