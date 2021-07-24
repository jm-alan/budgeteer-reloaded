import { useState } from 'react';

export default function HotswapInput ({ startingValue, onSubmitConstructor }) {
  const [edit, setEdit] = useState(false);
  const [contents, setContents] = useState(startingValue);

  return edit
    ? (
      <form
        onSubmit={onSubmitConstructor(() => setEdit(false))}
      >
        <input
          value={contents}
          onChange={({ target: { value } }) => setContents(value)}
          required
          className='hotswap-input'
        />
      </form>
      )
    : (
      <div className='hotswap-input-container'>
        <div className='hotswap-input-text'>
          {contents}
        </div>
        <button
          onClick={() => setEdit(true)}
          className='hotswap-input-edit'
        >Edit
        </button>
      </div>
      );
}
