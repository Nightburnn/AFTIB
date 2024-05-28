import React, { useState } from 'react';
import { Range } from 'react-range';

const RangeInput = ({ label, min, max, startValues = [min, max], step, minDiff }) => {
    const [values, setValues] = useState(startValues);

  return (
    <div className="form-wrap width-1">
      <span>{label}<br /></span>
      <div className="form-inline-flex-xs">
        <input
          className="rd-range-input-value rd-range-input-value-1 form-input"
          id="range-1"
          type="text"
          name="range-2"
          value={values[0]}
          readOnly
        />
        <span className="text-abbey dash">&mdash;</span>
        <input
          className="rd-range-input-value rd-range-input-value-2 form-input"
          id="range-2"
          type="text"
          name="range-3"
          value={values[1]}
          readOnly
        />
      </div>
      <Range
        step={0.1}
        min={0}
        max={100}
        values={[50, 50]}
        onChange={(newValues) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
    </div>
  );
};
export default RangeInput;