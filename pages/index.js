import { useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { IconButton, Divider, Chip, Alert, AlertTitle } from '@mui/material';
import FactionIcon from 'src/common/FactionIcon';
import robotoCondensed from 'config/font';

function FactionLinkButton({ faction }) {
  const router = useRouter();

  return (
      <IconButton onClick={() => router.push(`/list/${faction}`)} style={{ marginRight: 2 }}>
          <FactionIcon
              faction={faction}
              width={50}
              style={{ borderRadius: 50 }}
          />
      </IconButton>
  );
}

export default function Home() {
  const [isAboutUsDialogOpen, setIsAboutUsDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Project Rho</title>
        <meta name="description" content="Star Wars: Armada list builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: 20, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
          <Alert severity="info">
            <AlertTitle sx={{ fontSize: 18 }}><span className={robotoCondensed.className}>Under Construction!</span></AlertTitle>
            <span style={{ fontSize: 16 }}>
              <span className={robotoCondensed.className} style={{ fontSize: 18 }}>Major features coming soon:</span>
              <li className={robotoCondensed.className}>Upgrade swap button</li>
              <li className={robotoCondensed.className}>Free user accounts to save lists</li>
              <li className={robotoCondensed.className}>Various performance and quality of life enhancements</li>
              <li className={robotoCondensed.className}>UI Tweaks</li>
            </span>
          </Alert>
          <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', marginTop: 18 }}>
            <Chip
              clickable
              label={<span className={robotoCondensed.className} style={{ fontSize: 16 }}>What is this?</span>}
              className={robotoCondensed.className}
              onClick={() => setIsAboutUsDialogOpen(true)}
            />
          </div>
          <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              <FactionLinkButton faction="rebels" />
              <FactionLinkButton faction="empire" />
              <FactionLinkButton faction="republic" />
              <FactionLinkButton faction="separatists" />
          </div>
          <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
          <Chip
              clickable
              label={<span className={robotoCondensed.className} style={{ fontSize: 16 }}>Contact Us</span>}
              className={robotoCondensed.className}
              onClick={() => setIsContactDialogOpen(true)}
            />
        </div>
        <Dialog onClose={() => setIsAboutUsDialogOpen(false)} open={isAboutUsDialogOpen}>
            <DialogTitle><span className={robotoCondensed.className} style={{ fontSize: 24 }}>What is this?</span></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <span className={robotoCondensed.className} style={{ fontSize: 18 }}>This website is a (currently) untitled and unaffiliated list builder meant to be used to conveniently create lists for the Retcon Open tournament. It will be temporarily called Project Rho. The Retcon Open tournament rules are simple: No cards only found in wave 8.</span>
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
