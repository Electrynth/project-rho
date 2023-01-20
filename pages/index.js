import Head from 'next/head'
import { useRouter } from 'next/router';
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
  return (
    <div>
      <Head>
        <title>Project Rho</title>
        <meta name="description" content="Armada list builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: 20, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
          <h2><strong>Project Rho</strong></h2>
          <Alert severity="info" className={robotoCondensed.className}>
            <AlertTitle className={robotoCondensed.className}>Under Construction</AlertTitle>
            Major Phase 1 Features remaining (early-mid February):
            <li>Upgrade "swap" button</li>
            <li>Ship "copy" button</li>
            <li>Performance enhancements</li>
            <br />
            Major Phase 2 Features to come (late February - early March):
            <li>Account & List saving</li>
            <li>List exports</li>
            <li>List forking</li>
            <li>"Roadmap" section on homepage</li>
            <li>"About Us" section on homepage</li>
            <br />
            Feedback to think about
            <li>How is the interface usability? Clunky? Slow?</li>
            <li>How is the interface visuals? Ugly? Too much detail? Not enough?</li>
            <li>Do card images load quick enough? On desktop? On mobile?</li>
            <li>Are card images legible enough to read their text?</li>
            <li>Is the website text large enough to read?</li>
          </Alert>
          <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
            <Chip clickable label="Roadmap" className={robotoCondensed.className} />
            <span style={{ marginRight: 6 }} />
            <Chip clickable label="About Us" className={robotoCondensed.className} />
          </div>
          <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              <FactionLinkButton faction="rebels" />
              <FactionLinkButton faction="empire" />
              <FactionLinkButton faction="republic" />
              <FactionLinkButton faction="separatists" />
          </div>
          <Divider variant="middle" style={{ margin: '20px 0px', width: 300, backgroundColor: '#2f2f2f' }} />
          <Chip clickable label="Login" className={robotoCondensed.className} />
        </div>
    </div>
  )
}
