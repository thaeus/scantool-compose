import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import ScanFlip from './ScanFlip.web';
import CodeIcon from '@material-ui/icons/Code';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';

const styles = {
    media: {
        height: '18em',
    },
};

const mediaUrl = `https://marmelab.com/posters/beard-${parseInt(
    Math.random() * 10,
    10
) + 1}.jpeg`;

const Welcome = ({ classes, translate }) => (
    <Card>
        <ScanFlip />
        <CardContent>
            <Typography variant="headline" component="h1">
                {translate('pos.dashboard.welcome.title')}
                <br />
            </Typography>
            <Typography component="h2">
                {translate('pos.dashboard.welcome.subtitle')}
            </Typography>
        </CardContent>
    </Card>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(Welcome);
