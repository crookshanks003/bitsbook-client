import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

export default function TextEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    return <ReactQuill theme='snow' value={value} onChange={onChange} placeholder='Content...' />;
}
