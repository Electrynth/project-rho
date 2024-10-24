import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Divider,
  Chip,
  Alert,
  AlertTitle,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';

import NextHead from 'src/common/NextHead';
import FactionIcon from 'src/common/FactionIcon';
import robotoCondensed from 'config/font';
import urls from 'config/urls.json';
import changelog from 'config/changelog.json';

function FactionLinkButton({
  isAuthenticated,
  faction,
  lists = []
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const factionLists = [];

  lists.forEach(list => {
    if (list.faction === faction) factionLists.push(list);
  });


  return (
      <>
        <IconButton
          onClick={isAuthenticated ? (
            (event) => setAnchorEl(event.currentTarget)
          ) : (
            () => router.push(`/list/${faction}`)
          )}
          style={{ marginRight: 2 }}
        >
            <FactionIcon
                faction={faction}
                width={50}
                style={{ borderRadius: 50 }}
            />
        </IconButton>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          {factionLists.length < 12 ? (
            <MenuItem onClick={() => router.push(`/list/${faction}`) }>
              <span className={robotoCondensed.className}>Create New List</span>
            </MenuItem>
          ) : (
            <MenuItem disabled>
              <span className={robotoCondensed.className}>Max Number Lists</span>
            </MenuItem>
          )}
          <Divider />
          {factionLists.map((list, index) => {
            return (
              <MenuItem
                key={`list_${index}`}
                onClick={() => router.push(`/list/${list.listId}`) }
              >
                <span className={robotoCondensed.className}>{`${list.title} - ${list.points}`}</span>
              </MenuItem>
            );
          })}
        </Menu>
      </>
  );
}

export default function Home() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    loginWithPopup,
    logout
  } = useAuth0();

  const [userLists, setUserLists] = useState([]);
  const [isServerReachable, setIsServerReachable] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [serverErrorName, setServerErrorName] = useState();
  const [isAboutUsDialogOpen, setIsAboutUsDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  // const [builderAccess, setBuilderAccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user && user.email) {
      axios.get(`${urls.api}/users?email=${user.email}`).then(foundUser => {
        // if (user.settings && user.settings.builderAccess) setBuilderAccess(user.settings.builderAccess);
        axios.get(`${urls.api}/lists/email?email=${user.email}`).then(foundLists => {
          setUserLists(foundLists.data);
          setIsServerReachable(true);
        });
      }).catch(e => {
        setIsServerReachable(false);
        if (e.name) setServerErrorName(e.name);
        else setServerErrorName('No error name');
        if (e.message) setServerErrorMessage(e.message);
        else setServerErrorMessage('No error message found');
      });
    }
  }, [user]);

  return (
    <div>
      <NextHead />
      <div style={{ padding: 20, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
          {changelog.news[0].title ? (
            <Card sx={{ maxWidth: 340, marginTop: 2, marginBottom: 2 }}>
              <CardHeader
                title={<span className={robotoCondensed.className}>{changelog.news[0].title}</span>}
                subheader={<span className={robotoCondensed.className}>{changelog.news[0].date}</span>}
              />
              <CardContent>
                <span className={robotoCondensed.className}>{changelog.news[0].body}</span>
              </CardContent>
            </Card>
          ) : undefined}
          {!isServerReachable ? (
            <Alert variant="outlined" severity="error" style={{ marginTop: 18 }}>
              <AlertTitle>
                Server Error {serverErrorMessage && serverErrorName ? `: ${serverErrorMessage} (${serverErrorName})` : undefined}
              </AlertTitle>
              Lists may be unavailable.
            </Alert>
          ) : undefined}
          <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', marginTop: 18, marginBottom: 18 }}>
            <Chip
              clickable
              label={<span className={robotoCondensed.className} style={{ fontSize: 16 }}>What is this?</span>}
              className={robotoCondensed.className}
              style={{ marginRight: 8 }}
              onClick={() => setIsAboutUsDialogOpen(true)}
            />
            <Chip
              clickable
              label={<span className={robotoCondensed.className} style={{ fontSize: 16 }}>Contact Us</span>}
              className={robotoCondensed.className}
              onClick={() => setIsContactDialogOpen(true)}
            />
          </div>
          <Chip
            clickable={!isLoading}
            label={isLoading ?
              (
                <span className={robotoCondensed.className} style={{ fontSize: 16 }}>
                  Loading...
                </span>
              ) : (
                <span className={robotoCondensed.className} style={{ fontSize: 16 }}>
                  {isAuthenticated ? `Logout (${user.email})` : 'Login'}
                </span>
              )
            }
            className={robotoCondensed.className}
            onClick={() => {
              isAuthenticated ? (
                  logout({
                    logoutParams: {
                      returnTo: typeof window !== 'undefined' ? window.location.origin : undefined
                    }
                  })
                ) : (
                  loginWithPopup()
                )
            }}
          />
          <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="rebels" lists={userLists}/>
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="empire" lists={userLists} />
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="republic" lists={userLists} />
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="separatists" lists={userLists} />
          </div>
		    <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
        </div>
        <Dialog onClose={() => setIsAboutUsDialogOpen(false)} open={isAboutUsDialogOpen}>
            <DialogTitle><span className={robotoCondensed.className} style={{ fontSize: 24 }}>What is this?</span></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <span className={robotoCondensed.className} style={{ fontSize: 18 }}>
                  This website is an unofficial fan creation that is intended to act as platform for official, unofficial, and fan-created Star Wars: Armada content.
                </span>
              </DialogContentText>
              <br />
              <DialogContentText>
                <span className={robotoCondensed.className} style={{ fontSize: 18 }}>
                  All images, game symbols, and text is copyright Lucasfilm Ltd. and Atomic Mass Games. This website is NOT affiliated or sponsored by Atomic Mass Games.
                </span>
              </DialogContentText>
            </DialogContent>
        </Dialog>
        <Dialog onClose={() => setIsContactDialogOpen(false)} open={isContactDialogOpen}>
            <DialogTitle><span className={robotoCondensed.className} style={{ fontSize: 24 }}>Contact Us</span></DialogTitle>
            <DialogContent>
              <DialogContentText>
              <span className={robotoCondensed.className} style={{ fontSize: 18 }}>Questions, inquiries, feedback, bug reports, and feature requests may be emailed to <a style={{ color: '#a5d6ff' }} href="mailto:contact@legion-hq.com">contact@legion-hq.com</a> or may be sent in a direct message to nick on the Armada Hub discord server.</span>
              </DialogContentText>
            </DialogContent>
        </Dialog>
    </div>
  )
}
