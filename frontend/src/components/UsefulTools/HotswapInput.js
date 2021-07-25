import { useState } from 'react';

export default function HotswapInput ({ type = 'input', contents, setContents, onSubmitConstructor }) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const on = () => setLoading(true);
  const after = () => {
    setLoading(false);
    setEdit(false);
  };

  return edit
    ? (
      <form
        onSubmit={onSubmitConstructor(on, after)}
      >
        {(() => (
          (
            type === 'input' && (
              <input
                value={contents}
                onChange={({ target: { value } }) => setContents(value)}
                required
                className='hotswap-input'
              />
            )
          ) || (
            type === 'textarea' && (
              <textarea
                value={contents}
                onChange={({ target: { value } }) => setContents(value)}
                required
                className='hotswap-input large'
              />
            ))
        ))()}
        <button
          type='submit'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Done'}
        </button>
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
