interface Props {
    id: string;
    message?: string;
  }
export default function ErrorMessage({ id, message }: Props): JSX.Element {
    return <p id={id} className='text-[#FF0000]'>{message}</p>;
  }