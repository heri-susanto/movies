export default function Home() {
  return <div>Redirecting...</div>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/asian/1",
      permanent: false,
    },
  };
}
