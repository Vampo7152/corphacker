/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Disclosure, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Checkout } from "../../components/checkout";
import { ProductContext } from "../_app";
const products = [
  {
    name: "Non-Secrets of a Successful Presentation",
    price: 30,
    images:
    {
      id: 1,
      src: "https://res.cloudinary.com/dtzqgftjk/image/upload/v1671568146/Screenshot_2022-12-21_015850_jexciy.png",
      alt: "Non-Secrets of a Successful Presentation",
    },
    description: `
    Non-Secrets of a Successful Presentation is a Master Class on how to make your presentations stand out in the corporate world. This Master Class is based on the wealth of experience I gathered delivering and observing hundreds of presentations.
    `
  },
  {
    name: "Story Tells master-class",
    price: 30,
    images:
    {
      id: 1,
      src: "https://res.cloudinary.com/dtzqgftjk/image/upload/v1671568180/Screenshot_2022-12-21_015924_hxfgdr.png",
      alt: "Story Tells master-class",
    },
    description: `
    Story Tells is a Master Class that will teach you how to influence people. Yes, you know the answer - by telling stories. It's that simple. Yet great storytelling can be intimidating. Story Tells teaches you the structure and secrets that allow telling the right story in the right business context.
`
  },
  {
    name: "The Network",
    price: 30,
    images:
    {
      id: 1,
      src: "https://res.cloudinary.com/dtzqgftjk/image/upload/v1671573010/Screenshot_2022-12-21_031958_jsw9nm.png",
      alt: "The Network",
    },
    description: `
    The richest people in the world build networks; everyone else is trained to look for work. But we all know that any issue we have could be solved by someone. It is our duty to find that person, engage with them and make sure they want to stay by us. That is exactly what the Network Master Class is about.
`
  },
];
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
interface Product {
  id: number;
  name: string;
  href: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt: string;
}

const Item = () => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const prodContext = useContext(ProductContext);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    if (router.query.id) {
      setProduct(products[parseInt(router.query.id as string) - 1]);
    }
  }, [router.query.id]);
  const [open, setOpen] = useState<boolean>(false);
  if (product !== null) {
    return (
      <>
        <Checkout products={prodContext.prod} open={open} setOpen={setOpen} />
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <Tab.Group as="div" className="flex flex-col-reverse">
                <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                  <Tab.Panel>
                    <img
                      src={product?.images.src}
                      alt={product?.images.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1
                  className="text-3xl  font-bold tracking-tight text-gray-900"
                >
                  {product?.name}
                </h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl pb-5 tracking-tight text-gray-900">
                    $ {product?.price}
                  </p>
                </div>
                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />

                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    onClick={() => {
                      prodContext.setProd([
                        ...prodContext.prod,
                        {
                          id: parseInt(router.query.id as string) - 1,
                          name: product?.name,
                          image: product.images.src,
                          price: product.price,
                          quantity: 1
                        },
                      ]);
                      setOpen(true);
                    }}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
};

export default Item;
