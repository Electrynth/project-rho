import { useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { IconButton, Divider, Chip, Alert, AlertTitle, Typography } from '@mui/material';
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
  const [dialogHeader, setDialogHeader] = useState('');
  const [dialogBody, setDialogBody] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  return (
    <div>
      <Head>
        <title>Project Rho</title>
        <meta name="description" content="Armada list builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: 20, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
          <Alert severity="info" className={robotoCondensed.className}>
            <AlertTitle className={robotoCondensed.className}>Under Construction!</AlertTitle>
            Major features coming soon:
            <li>Upgrade swap button</li>
            <li>Ship copy button</li>
            <li>List exporting</li>
            <li>Free user accounts to save lists</li>
            <li>Various performance and quality of life enhancements</li>
            <li>UI Tweaks</li>
          </Alert>
          <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', marginTop: 18 }}>
            <Chip
              clickable
              label={<span className={robotoCondensed.className}>What is this?</span>}
              className={robotoCondensed.className}
              onClick={() => setIsDialogOpen(true)}
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
        </div>
        <Dialog className={robotoCondensed.className} onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
              <DialogTitle className={robotoCondensed.className}>What is this?</DialogTitle>
              <DialogContent>
                <DialogContentText className={robotoCondensed.className}>
                  This website is a currently untitled and unaffiliated (temporarily referred to has Project Rho) list builder meant to be used to conveniently create lists for the Retcon Open tournament.
                </DialogContentText>
                <br />
                <DialogContentText className={robotoCondensed.className}>
                  Questions, inquiries, feedback, bug reports, and feature requests may be emailed to <a style={{ color: 'blue' }} href="mailto:contact@legion-hq.com">contact@legion-hq.com</a> or may be sent in a direct message to nick on the Armada Hub discord server.
                </DialogContentText>
                <br />
                <DialogContentText className={robotoCondensed.className}>
                  This website is an unofficial fan creation. All images, game symbols, and text is copyright Lucasfilm Ltd. and Fantasy Flight Games / Atomic Mass Games. This website is not affiliated or sponsored by Atomic Mass Games.
                </DialogContentText>
              </DialogContent>
        </Dialog>
    </div>
  )
}
