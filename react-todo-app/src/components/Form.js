import { DOM_KEY_LOCATION } from '@testing-library/user-event/dist/keyboard/types';
import React from 'react'

export default function Form({handleSubmit, value, setValue}) {

  //렌더링 확인 로그
  console.log('Form Component Rendering');

  const handleChange = (e) => {
    console.log(e.target.value)
    //this.setState({value: e.target.value})
    setValue(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex pt-2">
        <input
          className="w-full px-3 py-2 mr-2 text-gray-600 border rounded-full shadow-md shadow-red-300"
          type="text" 
          name="value" 
          placeholder="해야 할 일을 입력하세요."
          value={value}
          onChange={handleChange}
        />

        <input
          className="p-2 text-red-400 border-2 border-red-400 rounded-full shadow-md shadow-red-300 hover:text-white hover:bg-red-400"
          type="submit"
          value="입력" 
        />
      </form>
    </div>
    
  )
}
