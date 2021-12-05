import React, { useState } from 'react';

export default function useTest() {
    const [value, setValue] = useState();

    console.log(value + ' test');
    return [value, setValue];
}
