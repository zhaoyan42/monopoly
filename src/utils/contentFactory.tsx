import { Country } from '../model/Country';
import { Player } from '../model/Player';
import { getCountryPrice, getPassagePrice } from '../model/CountryPriceMap';

export function createPurchaseAlertContent(player: Player, country: Country) {
  return (
    <div>
      <p>
        <span style={{ color: player.color }}>玩家</span>已经以
        <span style={{ color: '#FF0000' }}>${getCountryPrice(country, 0)}</span>
        的价格购买了
        <span style={{ color: '#FF0000' }}>{country.name}</span>
      </p>
    </div>
  );
}

export function createOwnAlertContent(player: Player, country: Country) {
  return (
    <div>
      <p>
        <span style={{ color: player.color }}>玩家</span>自己拥有
        <span style={{ color: '#FF0000' }}>{country.name}</span>
      </p>
    </div>
  );
}

export function createRentAlertContent(
  player: Player,
  country: Country,
  owner: Player,
) {
  return (
    <div>
      <p>
        <span style={{ color: player.color }}>玩家</span>需要支付
        <span style={{ color: '#FF0000' }}>${getPassagePrice(country, 0)}</span>
        的租金给
        <span style={{ color: owner.color }}>玩家</span>
      </p>
    </div>
  );
}

export function createConfirmContent(country: Country) {
  return (
    <div>
      <p>
        你想要以
        <span style={{ color: '#FF0000' }}>${getCountryPrice(country, 0)}</span>
        的价格买下
        <span style={{ color: '#FF0000' }}>{country.name}</span>吗?
      </p>
    </div>
  );
}
