/*import React, { useState, useEffect } from 'react';
import { 
    Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseclient';

export const Home = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [name, setName] = useState('');
    const [dateTaken, setDateTaken] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    // Fetch authenticated user's ID
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error);
            } else if (user) {
                setUserId(user.id);
            }
        };
        fetchUser();
    }, []);

    // Fetch subscriptions for the logged-in user
    useEffect(() => {
        if (!userId) return;

        const fetchSubscriptions = async () => {
            const { data, error } = await supabase
                .from('home')
                .select('*')
                .eq('id', userId); // Fetch only the logged-in user's subscriptions

            if (error) {
                console.error('Error fetching subscriptions:', error);
            } else {
                setSubscriptions(data);
            }
        };
        fetchSubscriptions();
    }, [userId]);

    // Handle adding a subscription
    const handleAddSubscription = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !dateTaken || !timePeriod || !userId) {
            setError('Please fill all fields.');
            return;
        }

        const { error } = await supabase.from('home').insert([
            {
                id: userId,
                subscription_name: name,
                date_taken: dateTaken,
                time_period: parseInt(timePeriod),
            },
        ]);

        if (error) {
            console.error('Error adding subscription:', error);
            setError('Error adding subscription.');
        } else {
            setSuccess('Subscription added successfully!');
            setSubscriptions([
                ...subscriptions,
                { id: userId, subscription_name: name, date_taken: dateTaken, time_period: timePeriod },
            ]);
            setName('');
            setDateTaken('');
            setTimePeriod('');
        }
    };

    // Function to check if the subscription is expired
    const isExpired = (dateTaken, timePeriod) => {
        const startDate = new Date(dateTaken);
        const expirationDate = new Date(startDate.getFullYear(), startDate.getMonth() + parseInt(timePeriod), startDate.getDate());
        return new Date() > expirationDate;
    };

    // Handle renewing a subscription
    const handleRenewSubscription = async (subscription) => {
        const newDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const { error } = await supabase
            .from('home')
            .update({ date_taken: newDate })
            .eq('id', userId)
            .eq('subscription_name', subscription.subscription_name);

        if (error) {
            console.error('Error renewing subscription:', error);
            setError('Error renewing subscription.');
        } else {
            setSuccess('Subscription renewed successfully!');
            setSubscriptions(subscriptions.map(sub =>
                sub.subscription_name === subscription.subscription_name
                    ? { ...sub, date_taken: newDate }
                    : sub
            ));

            // Redirect to Home2 after renewal
            navigate('/home2');
        }
    };

    // Handle deleting a subscription
    const handleDeleteSubscription = async (subscription) => {
        const { error } = await supabase
            .from('home')
            .delete()
            .eq('id', userId)
            .eq('subscription_name', subscription.subscription_name);

        if (error) {
            console.error('Error deleting subscription:', error);
            setError('Error deleting subscription.');
        } else {
            setSuccess('Subscription deleted successfully!');
            setSubscriptions(subscriptions.filter(sub => sub.subscription_name !== subscription.subscription_name));
        }
    };

    return (
        <Grid align="center">
            <Paper sx={{ width: { xs: '95vw', sm: '80vw', md: '60vw' }, padding: '2rem', boxShadow: '5px 5px 10px', borderRadius: '1rem' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Home</Typography>
                <TableContainer component={Paper} sx={{ marginTop: '1.5rem' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Subscription Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Date Taken</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Time Period (months)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>*/
                           // {/* Input Row for New Subscription */}
                            /*<TableRow>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        sx={{ width: '180px' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        type="date"
                                        value={dateTaken}
                                        onChange={(e) => setDateTaken(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ width: '180px' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        placeholder="Months"
                                        value={timePeriod}
                                        onChange={(e) => setTimePeriod(e.target.value)}
                                        sx={{ width: '120px' }}
                                    />
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleAddSubscription}
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>*/
                           // {/* Display Existing Subscriptions */}
                            /*{subscriptions.length > 0 ? (
                                subscriptions.map((sub, index) => {
                                    const expired = isExpired(sub.date_taken, sub.time_period);
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{sub.subscription_name}</TableCell>
                                            <TableCell>{new Date(sub.date_taken).toLocaleDateString()}</TableCell>
                                            <TableCell>{sub.time_period} months</TableCell>
                                            <TableCell>
                                                {expired ? (
                                                    <Typography color="error" sx={{ fontWeight: 'bold' }}>Expired</Typography>
                                                ) : (
                                                    <Typography color="primary" sx={{ fontWeight: 'bold' }}>Active</Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {expired ? (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleRenewSubscription(sub)}
                                                    >
                                                        Renew
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDeleteSubscription(sub)}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No subscriptions found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
};
*/
import React, { useState, useEffect } from 'react';
import { 
    Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    TextField,GlobalStyles
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseclient';

export const Home = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [name, setName] = useState('');
    const [dateTaken, setDateTaken] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    // Fetch authenticated user's ID
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error);
            } else if (user) {
                setUserId(user.id);
            }
        };
        fetchUser();
    }, []);

    // Fetch subscriptions for the logged-in user
    useEffect(() => {
        if (!userId) return;

        const fetchSubscriptions = async () => {
            const { data, error } = await supabase
                .from('home')
                .select('*')
                .eq('id', userId); // Fetch only the logged-in user's subscriptions

            if (error) {
                console.error('Error fetching subscriptions:', error);
            } else {
                setSubscriptions(data);
            }
        };
        fetchSubscriptions();
    }, [userId]);

    // Handle adding a subscription
    const handleAddSubscription = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !dateTaken || !timePeriod || !userId) {
            setError('Please fill all fields.');
            return;
        }

        const { error } = await supabase.from('home').insert([
            {
                id: userId,
                subscription_name: name,
                date_taken: dateTaken,
                time_period: parseInt(timePeriod),
            },
        ]);

        if (error) {
            console.error('Error adding subscription:', error);
            setError('Error adding subscription.');
        } else {
            setSuccess('Subscription added successfully!');
            setSubscriptions([
                ...subscriptions,
                { id: userId, subscription_name: name, date_taken: dateTaken, time_period: timePeriod },
            ]);
            setName('');
            setDateTaken('');
            setTimePeriod('');
        }
    };

    // Function to check if the subscription is expired
    const isExpired = (dateTaken, timePeriod) => {
        const startDate = new Date(dateTaken);
        const expirationDate = new Date(startDate.getFullYear(), startDate.getMonth() + parseInt(timePeriod), startDate.getDate());
        return new Date() > expirationDate;
    };

    // Handle renewing a subscription
    const handleRenewSubscription = async (subscription) => {
        const newDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const { error } = await supabase
            .from('home')
            .update({ date_taken: newDate })
            .eq('id', userId)
            .eq('subscription_name', subscription.subscription_name);

        if (error) {
            console.error('Error renewing subscription:', error);
            setError('Error renewing subscription.');
        } else {
            setSuccess('Subscription renewed successfully!');
            setSubscriptions(subscriptions.map(sub =>
                sub.sub_id === subscription.sub_id
                    ? { ...sub, date_taken: newDate }
                    : sub
            ));

            // Redirect to Home2 after renewal
            navigate('/home2');
        }
    };

    // Handle deleting a subscription
    const handleDeleteSubscription = async (subscription) => {
        console.log(subscription);
        const { error } = await supabase
            .from('home')
            .delete()
            .eq('id', userId)
            .eq('subscription_name', subscription.sub_id);

        if (error) {
            console.error('Error deleting subscription:', error);
            setError('Error deleting subscription.');
        } else {
            setSuccess('Subscription deleted successfully!');
            setSubscriptions(subscriptions.filter(sub => sub.subscription_name !== subscription.subscription_name));
        }
    };

    return (
        <>
        {/* Global Styles */}
        <GlobalStyles
          styles={{
            "html, body": {
              margin: 0,
              padding: 0,
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
            },
          }}
        />
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: "100vh",
            padding: "2rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)", // Sleek and professional gradient
          }}
        >
      <Paper
  elevation={12}
  sx={{
    width: "80vw", // Restricts width, causing horizontal scrollbar if content exceeds
    height: "60vh", // Restricts height, causing vertical scrollbar if content exceeds
    padding: "2.5rem",
    borderRadius: "1rem",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.85)", // Subtle transparency for a premium effect
    backdropFilter: "blur(12px)", // Enhanced Glassmorphism
    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)", // More refined depth
    border: "1px solid rgba(255, 255, 255, 0.3)", // Elegant thin border
    overflow: "auto", // Enables both vertical and horizontal scrolling
  }}
>
            <Typography sx={{ fontSize: "2.2rem", fontWeight: "700", color: "purple", mb: "1.5rem" }}>
              Subscription Tracker
            </Typography>
      
            {/* Table Container */}
            <TableContainer sx={{ marginTop: "1rem", borderRadius: "0.8rem", overflow: "hidden" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#1E88E5" }}>
                    {["Subscription Name", "Date Taken", "Time Period (Months)", "Status", "Action"].map((header) => (
                      <TableCell key={header} sx={{ fontWeight: "bold", fontSize: "1rem", color: "white", textAlign: "center" }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Input Row */}
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell align="center">
                      <TextField fullWidth variant="outlined" size="small" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} sx={{ width: "180px", backgroundColor: "white", borderRadius: "0.5rem" }} />
                    </TableCell>
                    <TableCell align="center">
                      <TextField fullWidth variant="outlined" size="small" type="date" value={dateTaken} onChange={(e) => setDateTaken(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ width: "180px", backgroundColor: "white", borderRadius: "0.5rem" }} />
                    </TableCell>
                    <TableCell align="center">
                      <TextField fullWidth variant="outlined" size="small" type="number" placeholder="Months" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} sx={{ width: "120px", backgroundColor: "white", borderRadius: "0.5rem" }} />
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      <Button variant="contained" size="small" sx={{ backgroundImage: "green" } } onClick={handleAddSubscription}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
      
                  {/* Display Existing Subscriptions */}
                  {subscriptions.length > 0 ? (
                    subscriptions.map((sub, index) => {
                      const expired = isExpired(sub.date_taken, sub.time_period);
                      return (
                        <TableRow key={index} sx={{ backgroundColor: expired ? "#ffe0b2" : "white" }}>
                          <TableCell align="center">{sub.subscription_name}</TableCell>
                          <TableCell align="center">{new Date(sub.date_taken).toLocaleDateString()}</TableCell>
                          <TableCell align="center">{sub.time_period} months</TableCell>
                          <TableCell align="center">
                            <Typography sx={{ fontWeight: "bold", color: expired ? "#D32F2F" : "#388e3c" }}>{expired ? "Expired" : "Active"}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            {expired ? (
                              <Button variant="contained" size="small" sx={{ backgroundImage: "green" } } onClick={() => handleRenewSubscription(sub)}>
                                Renew
                              </Button>
                            ) : (
                              <Button variant="contained" size="small" sx={{ background: "#D32F2F", color: "white", fontWeight: "bold", "&:hover": { background: "#B71C1C" } }} onClick={() => handleDeleteSubscription(sub)}>
                                Delete
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ padding: "1.5rem", fontStyle: "italic", color: "#777" }}>
                        No subscriptions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        </>
      );
};
    