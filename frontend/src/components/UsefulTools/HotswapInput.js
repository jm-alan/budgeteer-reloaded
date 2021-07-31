import { useState } from 'react';

export default function HotswapInput ({ type = 'input', fallback = null, maxLength, contents, setContents, onSubmitConstructor }) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const on = () => setLoading(true);
  const after = () => {
    setLoading(false);
    setEdit(false);
  };

  return (
    <div className='hotswap-container'>
      {edit
        ? (
          <form
            className='hotswap-form'
            onSubmit={onSubmitConstructor(on, after)}
          >
            {(() => (
              (
                type === 'input' && (
                  <input
                    value={contents}
                    onChange={({ target: { value } }) => setContents(value)}
                    required
                    maxLength={maxLength}
                    disabled={loading}
                    className='hotswap-input'
                  />
                )
              ) || (
                type === 'textarea' && (
                  <textarea
                    value={contents}
                    onChange={({ target: { value } }) => setContents(value)}
                    required
                    disabled={loading}
                    maxLength={maxLength}
                    className='hotswap-input large'
                  />
                ))
            ))()}
            <button
              type='submit'
              disabled={loading}
              onClick={e => e.stopPropagation()}
            >
              Done
            </button>
          </form>
          )
        : (
          <>
            {(fallback && fallback(contents)) || (
              <div className='hotswap-text'>
                {contents}
              </div>
            )}
            <button
              onClick={e => e.stopPropagation() ?? setEdit(true)}
              className='hotswap-edit'
            >
              Edit
            </button>
          </>
          )}
    </div>
  );
}
