
  export const useGetStaticPaths = (paths: any) => {
    async function getStaticPaths() {
        return {
            // paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
          paths: [paths],
          fallback: false, // can also be true or 'blocking'
        }
      }
    return {
        getStaticPaths
    };
  };