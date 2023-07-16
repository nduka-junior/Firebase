import React from "react";
import Image from "next/image";
import moment from "moment/moment";
function Feed({ feed }) {
  const custom_grid3 = feed.image.length == 3 ? "custom_grid3" : "";
  const custom_grid4 = feed.image.length == 4 ? "custom_grid4" : "";
  return (
    feed && (
      <>
        <div className="mt-4 p-3 w-[100%] justify-center   ">
          <div className="flex  w-[100%] items-start  ">
            <Image
              src={feed.photoURL}
              width={30}
              height={30}
              alt={feed.name}
              className="rounded-full"
            />
            <div className="ml-3">
              <div className="flex items-center  mb-3">
                <h1 className="text-xs font-bold   text-[#c0c0c0]">
                  {feed.name}
                </h1>
                <h1 className="text-[9px] ml-2 text-[#c0c0c0]">
                  {moment(feed.date).fromNow()}
                </h1>
              </div>
              <p className="text-[13px]">{feed.text} </p>
              <div className="grid  grid-cols-2 custom_main gap-2 mt-3 ">
                {feed.image &&
                  feed.image.map((url, i) => {
                    return (
                      <div
                        key={i}
                        className={` ${custom_grid3} ${custom_grid4}  `}
                      >
                        <Image
                          src={url}
                          width={300}
                          height={100}
                          alt={feed.name}
                          style={{
                            objectFit: " cover",
                            height: "100%",
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </>
    )
  );
}

export default Feed;
