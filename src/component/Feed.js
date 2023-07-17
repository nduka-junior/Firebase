import React from "react";
import Image from "next/image";
import moment from "moment/moment";
function Feed({ feed }) {
  const custom_grid3 = feed.image.length == 3 ? "custom_grid3" : "";
  const custom_grid4 = feed.image.length == 4 ? "custom_grid4" : "";
  const grid_1 = feed.image.length == 1 ? "grid_1" : "";
  const grid_2 = feed.image.length == 2 ? "grid_2" : "";
  const grid_3 = feed.image.length == 3 ? "grid_3" : "";
  const grid_4 = feed.image.length == 4 ? "grid_4" : "";
  return (
    feed && (
      <>
        <div className="mt-4 pt-3 pb-[40px] w-[100%]  border-b-2 border-[#8080807c] border-solid ">
          <div className="flex  justify-center  w-[100%] items-start  ">
            <Image
              src={feed.photoURL}
              width={30}
              height={30}
              alt={feed.name}
              className="rounded-full"
            />
            <div className="ml-3 justify-start  w-[100%] ">
              <div className="flex items-center  mb-3">
                <h1 className="text-xs font-bold   text-[#c0c0c0]">
                  {feed.name}
                </h1>
                <h1 className="text-[9px] ml-2 text-[#c0c0c0]">
                  {moment(feed.date).fromNow()}
                </h1>
              </div>
              <p className="text-[13px]">{feed.text} </p>
              {feed.image.length > 0 && (
                <div
                  className={`grid xl:w-[600px]  mt-3 border-[1.3px] border-[#80808089] border-solid rounded-xl ${grid_1} ${grid_2} ${grid_3} ${grid_4} `}
                >
                  {feed.image.map((url, i) => {
                    return (
                      <div
                        key={i}
                        className={` ${custom_grid3} ${custom_grid4} max-h-[250px]   `}
                      >
                        <Image
                          src={url}
                          width={300}
                          height={100}
                          alt={feed.name}
                          className="rounded-xl "
                          style={{
                            objectFit: " cover",
                            height: "100%",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Feed;
