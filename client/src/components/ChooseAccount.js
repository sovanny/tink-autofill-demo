import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { AutofillContext } from '../Context/AutofillContext';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button
} from '@material-ui/core';
import '../global.css';
import Message from './Message';

const ChooseAccount = ({ location }) => {
  const [code, setCode] = useState();
  const [accounts, setAccounts] = useState();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const { setAutofillContent } = useContext(AutofillContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('error')) {
      if (searchParams.get('error') === 'USER_CANCELLED') {
        setRedirect(true);
        return;
      }
      console.error('errror :', searchParams.get('error'));
      console.error('message :', searchParams.get('message'));
      setError(true);
    } else if (searchParams.has('code')) setCode(searchParams.get('code'));
  }, [location]);

  useEffect(() => {
    if (code) {
      axios
        .get(`/get-accounts/${code}`)
        .then(response => {
          setAccounts(response.data.accounts);
        })
        .catch(error => {
          console.error(error);
          setError(true);
        });
    }
  }, [code]);

  const handleClick = (e, account) => {
    setAutofillContent(account);
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/" />;
  if (error)
    return (
      <Message text="Something went wrong">
        <Button href="/"> Go back</Button>
      </Message>
    );
  if (accounts)
    return (
      <div>
        <h2>Choose account</h2>
        {accounts.map(account => (
          <Card key={account.accountNumber} className="account-card">
            <CardActionArea onClick={e => handleClick(e, account)}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {account.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {account.accountNumber}
                </Typography>
                <Typography color="textSecondary" component="p">
                  {account.currencyCode}
                  {account.balance}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <div className="buttons">
          <Button
            className="tinkButton"
            variant="contained"
            href="/"
            disableElevation
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  else return <Message text="Loading..." />;
};
export default ChooseAccount;
