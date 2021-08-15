export default function Home() {
  return <div>Redirecting...</div>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/1",
      permanent: false,
    },
  };
}
