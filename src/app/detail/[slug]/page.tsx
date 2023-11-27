import Image from 'next/image';
import React from 'react';

import 'rsuite/dist/rsuite.min.css';

import Header from '@/components/common/Header';
import HeaderNav from '@/components/common/HeaderNav';
import SubmitButton from '@/components/common/SubmitButton';
import Carousel from '@/components/detail/Carousel';
import DatePicker from '@/components/detail/DateRagePicker';
import PersonInput from '@/components/detail/PersonInput';
import Rules from '@/components/detail/Rules';

import detailInfoRequest from '@/app/api/detailInfoRequest';

const Detail = async () => {
  const details = await detailInfoRequest.getDetail({
    id: '1',
    checkIn: '2023-11-25',
    checkOut: '2023-11-26',
  });

  return (
    <>
      <Header>
        <HeaderNav showBack showCart showHome>
          {details.data.name}
        </HeaderNav>
      </Header>
      <main>
        <div className='mt-12 bg-white'>
          <div>
            <Carousel images={details.data.imageUrl} />
          </div>
          <div className='flex flex-col gap-4 p-5'>
            <div className='border-mediumGray border-b border-solid pb-3'>
              <h3 className='text-[24px]'>{details.data.name}</h3>
            </div>
            <div className='border-mediumGray border-b border-solid pb-3'>
              <p>{details.data.address}</p>
              <p>
                체크인 {details.data.rooms[0].checkInTime} - 체크아웃
                {details.data.rooms[0].checkOutTime}
              </p>
            </div>
            <div className='border-mediumGray flex justify-evenly border-b border-solid pb-3 '>
              <div className='flex flex-col'>
                <label htmlFor='check'>체크인-체크아웃</label>
                <DatePicker />
              </div>
              <div>
                <PersonInput />
              </div>
            </div>
            <div className='flex flex-col gap-10'>
              {details.data.rooms.map((room: any, index: any) => (
                <div
                  key={index}
                  className='border-mediumGray flex flex-col gap-5 rounded border border-solid p-5'
                >
                  <div className='flex justify-between'>
                    <div className='mr-5'>
                      <Image
                        src={room.imageUrl}
                        width={150}
                        height={150}
                        alt={`Room ${index + 1}`}
                        className='h-full w-48 object-cover'
                      />
                    </div>
                    <div className='flex grow flex-col gap-5 pt-3'>
                      <div>
                        <p>{room.name}</p>
                        <p>최대 인원: {room.maxGuestCount}</p>
                        <p>최소 인원: {room.basicGuestCount}</p>
                        <p>
                          옵션:
                          {room.roomBathFacility === 'Y' && '욕조, '}
                          {room.roomBath === 'Y' && '욕실, '}
                          {room.roomHomeTheater === 'Y' && '홈시어터, '}
                          {room.roomAircondition === 'Y' && '에어컨, '}
                          {room.roomTv === 'Y' && 'TV, '}
                          {room.roomPc === 'Y' && 'PC, '}
                          {room.roomCable === 'Y' && '멀티탭, '}
                          {room.roomInternet === 'Y' && 'WIFI, '}
                          {room.roomRefrigerator === 'Y' && '냉장고, '}
                          {room.roomToiletries === 'Y' && '욕실용품, '}
                          {room.roomSofa === 'Y' && '소파, '}
                          {room.roomCook === 'Y' && '주방, '}
                          {room.roomTable === 'Y' && '식탁, '}
                          {room.roomHairdryer === 'Y' && '헤어드라이기'}
                        </p>
                      </div>
                      <div className='flex items-end justify-end'>
                        <p className='text-baseline text-[20px] font-bold leading-4'>
                          남은 객실: {room.stock}
                        </p>
                      </div>
                      <div className='flex flex-row justify-end gap-3'>
                        <p className='text-baseline text-[26px] font-bold leading-4'>
                          {room.price}원
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row'>
                    <button className='border-mediumGray mr-3 flex h-12 w-12 items-center justify-center rounded border border-solid p-1'>
                      <Image
                        src='/svg/cartIcon.svg'
                        alt='cartIcon'
                        className='h-6 w-6'
                        width={30}
                        height={30}
                      />
                    </button>
                    <SubmitButton
                      content='예약하기'
                      activate
                      className='grow-1'
                    ></SubmitButton>
                  </div>
                </div>
              ))}
            </div>
            <div className='border-mediumGray border-b border-solid py-8'>
              <Rules />
            </div>
            <div className='py-8'>
              <p className='text-[18px] font-bold'>숙소소개</p>
              <p>{details.data.description}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Detail;
