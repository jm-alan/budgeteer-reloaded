import { useState } from 'react';

export default function HotswapInput ({ contents, setContents, onSubmitConstructor }) {
  const [edit, setEdit] = useState(false);

  const revert = () => setEdit(false);

  return edit
    ? (
      <form
        onSubmit={onSubmitConstructor(revert)}
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
