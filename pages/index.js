import React, { Fragment } from 'react';
import { useRouter } from "next/router";
import Error from "next/error";
import { connect } from 'react-redux';
import { fetchApodStart } from '../store/reducers/apod';
import { fetchProductsStart } from '../store/reducers/productsData';
import { usePreviewSubscription } from "../utils/sanity";
import ProductsPage from "../components/ProductsPage";

const query = `//groq
  *[_type == "product" && defined(slug.current)]
`;

const mapStateToProps = state => ({
  apod: state.apod,
  productsData: state.productsData
});

const mapDispatchToProps = dispatch => ({
  fetchApod: date => dispatch(fetchApodStart(date)),
  fetchProducts: (preview, query) => dispatch(fetchProductsStart(preview, query))
});

const preview = false

function IndexPage (props) {
  const { apod, productsData } = props;
  const router = useRouter();
  const { data: pd } = productsData
  if (!router.isFallback && !pd) {
    return <Error statusCode={404} />;
  }
  const { data: products } = usePreviewSubscription(query, {
    initialData: pd,
    enabled: preview || router.query.preview !== null,
  });
  return (
    <Fragment>
      <div>
        <div className="mt-4">
          <ProductsPage products={products} />
        </div>
      </div>
      <div>
        <style jsx>
          {`
            .apod-img {
              width: 70%;
            }
          `}
        </style>
        <img className="apod-img" src={apod.data.url} alt="" />
      </div>
    </Fragment>
  );
}
IndexPage.getServerSideProps = async({ params = {}, isServer, store}) => {
  // const productsData = await getClient(preview).fetch(query);
  // Fetch today NASA APOD
  await store.execSagaTasks(isServer, dispatch => {
    dispatch(fetchProductsStart(preview, query));
    dispatch(fetchApodStart());
  });

  console.log('');
  console.log('###############################');
  console.log('### Fetched today NASA APOD ###');
  console.log('###############################');
  console.log(store.getState().apod);
  console.log('');

  // Fetch custom date NASA APOD
  await store.execSagaTasks(isServer, dispatch => {
    dispatch(fetchApodStart('2018-07-26'));
  });

  console.log('');
  console.log('#####################################');
  console.log('### Fetched custom date NASA APOD ###');
  console.log('#####################################');
  console.log(store.getState().apod);
  console.log('');

  return {
    props: {
      apod: store.getState().apod,
      productsData: store.getState().productsData
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
