import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {
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
          <Divider />
          <MenuItem onClick={() => router.push(`/list/${faction}`) }>
            <span className={robotoCondensed.className}>Create New List</span>
          </MenuItem>
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
    logout
  } = useAuth0();

  const [userLists, setUserLists] = useState([]);

  const [isAboutUsDialogOpen, setIsAboutUsDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      axios.get(`${urls.api}/users?email=${user.email}`).then(foundUser => {
        axios.get(`${urls.api}/lists/email?email=${user.email}`).then(foundLists => {
          setUserLists(foundLists.data);
        });
      });
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Project Rho</title>
        <meta name="description" content="Star Wars: Armada list builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: 20, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ maxWidth: 340, marginTop: 2, marginBottom: 2 }}>
            <CardHeader
              title={<span className={robotoCondensed.className}>{changelog.news[0].title}</span>}
              subheader={<span className={robotoCondensed.className}>{changelog.news[0].date}</span>}
            />
            <CardContent>
              <span className={robotoCondensed.className}>{changelog.news[0].body}</span>
            </CardContent>
          </Card>
          <Alert severity="info">
            <AlertTitle sx={{ fontSize: 18 }}><span className={robotoCondensed.className}>Under Construction!</span></AlertTitle>
            <span style={{ fontSize: 16 }}>
              <span className={robotoCondensed.className} style={{ fontSize: 18 }}>Major features coming soon:</span>
              <li className={robotoCondensed.className}>Upgrade swap button</li>
              <li className={robotoCondensed.className}>Copying lists</li>
              <li className={robotoCondensed.className}>Various UI Improvements</li>
            </span>
          </Alert>
          <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', marginTop: 18 }}>
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
          <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="rebels" lists={userLists}/>
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="empire" lists={userLists} />
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="republic" lists={userLists} />
              <FactionLinkButton isAuthenticated={isAuthenticated} faction="separatists" lists={userLists} />
          </div>
          <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
            <Chip
              clickable={!isLoading}
              label={
                <span className={robotoCondensed.className} style={{ fontSize: 16 }}>
                  {isAuthenticated ? `Logout (${user.email})` : 'Login'}
                </span>
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
                    loginWithRedirect()
                  )
              }}
            />
        </div>
        <Dialog onClose={() => setIsAboutUsDialogOpen(false)} open={isAboutUsDialogOpen}>
            <DialogTitle><span className={robotoCondensed.className} style={{ fontSize: 24 }}>What is this?</span></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <span className={robotoCondensed.className} style={{ fontSize: 18 }}>This website is a (currently) untitled and unaffiliated list builder meant to be used to conveniently create lists for the Retcon Open tournament. The Retcon Open tournament is a reoccuring tournament using Tabletop Simulator that may use alternative rulesets. It may also be used as a stopgap to wait for Kingston's builder to be updated if or when AMG makes changes to cards.</span>
              </DialogContentText>
              <br />
              <DialogContentText>
                <span className={robotoCondensed.className} style={{ fontSize: 18 }}>This website is an unofficial fan creation. All images, game symbols, and text is copyright Lucasfilm Ltd. and Fantasy Flight Games / Atomic Mass Games. This website is not affiliated or sponsored by Atomic Mass Games.</span>
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
