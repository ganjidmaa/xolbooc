/* eslint-disable react/jsx-no-target-blank */
import {AsideMenuItemWithSubMain} from './AsideMenuItemWithSubMain'
import {AsideMenuItem} from './AsideMenuItem'
import {useAuth} from '../../../../app/modules/auth'
import {ROLES} from '../../../helpers'

export function AsideMenuMain() {
  const {settings, currentUser, paymentMethods} = useAuth()
  const userRole = currentUser?.role as string
  const activeCoupon =
    paymentMethods &&
    paymentMethods.filter((paymentMethod) => {
      return paymentMethod.slug === 'coupon' && paymentMethod.active
    })[0]?.active
  const activeMembership =
    paymentMethods &&
    paymentMethods.filter((paymentMethod) => {
      return paymentMethod.slug === 'membership' && paymentMethod.active
    })[0]?.active

  return (
    <>
      <AsideMenuItem
        to='calendar/index'
        title='Календар'
        fontIcon='bi-calendar3'
        bsTitle='Календар'
        className='py-3'
      />
      {[ROLES.ADMIN, ROLES.ACCOUNTANT].includes(userRole) && (
        <>
          <AsideMenuItemWithSubMain to='/reports' title='Тайлан' fontIcon='bi-bar-chart-line'>
            <AsideMenuItem
              to='/dashboard'
              title='График, чарт'
              hasBullet={true}
              bsTitle='График, чарт'
            />
            <AsideMenuItem
              to='/report'
              title='Эксел тайлан'
              hasBullet={true}
              bsTitle='Эксел тайлан'
            />
            <AsideMenuItem
              to='/detail_table/list'
              title='Дэлгэрэнгүй'
              hasBullet={true}
              bsTitle='Дэлгэрэнгүй тайлан'
            />
          </AsideMenuItemWithSubMain>
        </>
      )}

      {userRole === ROLES.ADMIN && (
        <AsideMenuItem
          to='/user/list'
          title='Ажилтан'
          fontIcon='bi-person-check'
          bsTitle='Ажилчид'
          className='py-3'
        />
      )}
      
      {[ROLES.ADMIN, ROLES.RECEPTION].includes(userRole) && (
        <AsideMenuItem
          to='/customer/list'
          title='Үйлчлүүлэгч'
          fontIcon='bi-people'
          bsTitle='Үйлчлүүлэгчид'
          className='py-3'
        />
      )}

      {[ROLES.ADMIN, ROLES.ACCOUNTANT].includes(userRole) && (
        <AsideMenuItem
          to='/service/list'
          title='Ангилал, үйлчилгээ'
          fontIcon='bi-cart'
          className='py-3'
          bsTitle='Ангилал, үйлчилгээ'
        />
      )}
      {/* <AsideMenuItem
        to='/app_options/list'
        title='Захиалгын онош'
        fontIcon='bi-clipboard-heart'
        className='py-3'
        bsTitle='Захиалгын онош'
      /> */}
      {/* <AsideMenuItem
        to='/resource/list'
        title='Нөөц'
        fontIcon='bi-box-seam'
        className='py-3'
        bsTitle='Нөөц'
      /> */}

      {[ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.RECEPTION].includes(userRole) && (
        <>
          <AsideMenuItemWithSubMain to='/discounts' title='Хөнгөлөлт' fontIcon='bi-star'>
            <AsideMenuItem
              to='/promote/discount/list'
              title='Хөнгөлөлт'
              hasBullet={true}
              bsTitle='Хөнгөлөлт'
            />
            {activeCoupon && (
              <AsideMenuItem
                  to='/promote/coupon/type'
                  title='Купон '
                  hasBullet={true}
                  bsTitle='Купон '
                />
            )}
            
            {activeMembership && (
                <AsideMenuItem
                  to='/promote/membership/type_list'
                  title='Гишүүнчлэл'
                  hasBullet={true}
                  bsTitle='Гишүүнчлэл'
                />
            )}
          </AsideMenuItemWithSubMain>

          {settings?.sms_send === 1 && (
            <AsideMenuItem
              to='/sms_history'
              title='Мэссэж түүхүүд'
              fontIcon='bi-envelope'
              bsTitle='Мэссэж түүхүүд'
              className='py-3'
            />
          )}
        </>
      )}

      {userRole === ROLES.ADMIN && (
        <>
          {settings?.has_branch && (
            <AsideMenuItem
              to='/branch/list'
              title='Салбар'
              fontIcon='bi-building'
              bsTitle='Салбарууд'
              className='py-3'
            />
          )}
    

          <AsideMenuItemWithSubMain to='/settings' title='Тохиргоо' fontIcon='bi-gear'>
            <AsideMenuItem
              to='/settings/master'
              title='Мастер тохиргоо'
              hasBullet={true}
              bsTitle='Мастер тохиргоо'
            />
            <AsideMenuItem
              to='/bank_account/list'
              title='Дансны мэдээлэл'
              hasBullet={true}
              bsTitle='Дансны мэдээлэл'
            />
            <AsideMenuItem
              to='/booking-settings/online-booking'
              title='Онлайн захиалга'
              hasBullet={true}
              bsTitle='Онлайн захиалгын тохиргоо'
            />
            <AsideMenuItem
              to='/shift/schedules'
              title='Ажиллах хуваарь'
              hasBullet={true}
              bsTitle='Хуваарь'
          />
          </AsideMenuItemWithSubMain>
        </>
      )}
    </>
  )
}
