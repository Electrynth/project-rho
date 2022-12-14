import Head from 'next/head'
import { useRouter } from 'next/router';
import { IconButton, Divider, Chip } from '@mui/material';
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
          <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
            <Chip clickable label="Roadmap" className={robotoCondensed.className} />
            <span style={{ marginRight: 6 }} />
            <Chip clickable label="Dice Roller" className={robotoCondensed.className} />
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
