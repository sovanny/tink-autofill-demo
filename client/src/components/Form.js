import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import '../global.css';
import { AutofillContext } from '../Context/AutofillContext';
import Message from './Message';

const Form = () => {
  const [fullName, setFullName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [helperTextName, setHelperTextName] = useState('');
  const [helperTextAccount, setHelperTextAccount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { autofillContent, tinkLink } = useContext(AutofillContext);

  useEffect(() => {
    if (autofillContent?.holderName) {
      setFullName(autofillContent.holderName);
      setHelperTextName('Autofilled with Tink');
    }
    if (autofillContent?.accountNumber) {
      setAccountNumber(autofillContent.accountNumber);
      setHelperTextAccount('Autofilled with Tink');
    }
  }, [autofillContent]);

  return (
    <div className="form-container">
      {submitted ? (
        <Message text="Thank you for submitting" animate="animate">
          <Button onClick={() => setSubmitted(false)}> Go back</Button>
        </Message>
      ) : (
        <>
          <div className="form-info">
            <h1>Tink autofill demo</h1>
            <p>Fill out the form to complete your request.</p>
          </div>
          <form className="form">
            <TextField
              label="Full name"
              className="textField"
              helperText={helperTextName}
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              margin="dense"
              variant="outlined"
            />

            <div className="input">
              <TextField
                label="Account number"
                className="textField"
                helperText={helperTextAccount}
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="buttons">
              <div className="button-wrapper">
                <Button
                  className="tinkButton"
                  variant="contained"
                  href={tinkLink}
                  disableElevation
                >
                  Autofill with Tink
                </Button>
              </div>
              <div className="button-wrapper">
                <Button
                  className="submitButton"
                  variant="contained"
                  color="primary"
                  onClick={() => setSubmitted(true)}
                  disableElevation
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
