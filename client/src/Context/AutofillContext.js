import React, { createContext, useState } from 'react';

export const AutofillContext = createContext();
const AutofillContextProvider = props => {
  const [autofillContent, setAutofillContent] = useState({});
  const tinkLink = process.env.REACT_APP_TINK_LINK;

  return (
    <AutofillContext.Provider
      value={{ autofillContent, setAutofillContent, tinkLink }}
    >
      {props.children}
    </AutofillContext.Provider>
  );
};

export default AutofillContextProvider;
