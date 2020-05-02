import React from 'react';
import { Card } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';

import './Card.scss';

const UserCard = () => {
  return (
    <Card classes={{ root: 'User' }}>
      <CardActionArea>
        <CardMedia
          classes={{ root: 'User__image' }}
          style={{ backgroundPosition: 'left top' }}
        ></CardMedia>
        <CardContent classe={{ root: 'User-content' }}>
          <p className="User-content__name">Kim Jong-un</p>
          <p className="User-content__desc">
          I am a North Korean politician who is the supreme leader of North Korea since 2011 and leader of the Workers' Party of Korea since 2012. He is the second child of Kim Jong-il and Ko Yong-hui.
          </p>
          <p className="User-content__category">Web developer</p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button className="User__btn">View Details</button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
