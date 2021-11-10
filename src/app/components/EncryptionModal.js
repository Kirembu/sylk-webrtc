
'use strict';

const React          = require('react');
const PropTypes      = require('prop-types');
const { makeStyles } = require('@material-ui/core/styles');
const {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions }  = require('@material-ui/core');
const { Button }     = require('../MaterialUIAsBootstrap');


const styleSheet = makeStyles({
    bigger: {
        '&> h2': {
            fontSize: '20px'
        },
        '&> div > p ': {
            fontSize: '14px'
        },
        '&> li.MuiListSubheader-root': {
            fontSize: '14px',
            textAlign: 'left'
        }
    },
    fixFont: {
        fontFamily: 'inherit',
        fontSize: '14px',
        textAlign: 'left'
    },
    number: {
        fontSize: 32,
        textAlign: 'center',
        display: 'block',
        letterSpacing: 12,
        padding: 8
    }
});

function getContent(step = 0, exp) {
    if (step === 1 && exp) {
        return (<React.Fragment>
            To replicate messages on multiple devices you need the same private key on all of them.<br/> <br/>
            Press <strong>Export</strong> and enter this code when prompted on your other device:<br/>
        </React.Fragment>);
    } else if (step === 1 && !exp) {
        return (<React.Fragment>
            To replicate messages on multiple devices you need the same private key on all of them.<br/> <br/>
            Enter this code when prompted on your other device:<br/>
        </React.Fragment>);
    }
    return (<React.Fragment>
        You have used Sylk on another device/browser and you have a different PGP key on this device/browser.<br/><br />
        The PGP key from <strong>this device/brower</strong> can be used for <strong>all</strong> other devices/browsers.
        If you choose to use this key, previous messages cannot be read on newer devices.<br /><br/>
        If you <strong>don't</strong> want to use this key, you need to choose <strong><em>Export private key</em></strong> on your other device/browser.<br /><br/>
        Messaging can't be enabled unless you do either of these steps.<br /><br/>
        <span className="text-warning"><strong>Would you like to use <strong>this</strong> private key across all other devices?</strong></span>
    </React.Fragment>);
}

        // On the other devices, you'll need to enter the password that will be provided here upon export.< br/>
const EncryptionModal = (props) => {
    const classes = styleSheet();
    const [step, setStep] = React.useState(0);
    const [password, setPassword] = React.useState();

    React.useEffect(() => {
        if (props.show === true) {
            setPassword(Math.random().toString().substr(2, 6));
        }
    }, [props.show]);

    return (
        <Dialog
            open={props.show}
            onClose={props.close}
            maxWidth="sm"
            fullWidth={true}
            aria-labelledby="dialog-titile"
            aria-describedby="dialog-description"
        >
        <DialogTitle id="dialog-title" className={classes.bigger}>Export private key</DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="dialog-description" className={classes.fixFont}>
                    {getContent(props.export ? 1 : step, props.export)}
                    {props.export || step === 1 && <span className={classes.number}>{password}</span>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            {props.export === false && step !==  1 && (<React.Fragment>
                <Button
                    variant="contained"
                    onClick={() => {
                        setStep(1);
                        props.useExistingKey(password);
                    }}
                    title="yes"
                >
                    Yes
                </Button>
                <Button onClick={props.close} variant="text" title="cancel">No</Button>
            </React.Fragment>)}
            {props.export === true && (
                <Button
                    variant="contained"
                    onClick={() => {
                        props.exportKey(password);
                    }}
                    title="export"
                >
                    Export
                </Button>
            )}
            {(step === 1 || props.export === true) && (
                <Button onClick={props.close} variant="text" title="close">Close</Button>
            )}
            </DialogActions>
        </Dialog>
    );
}

EncryptionModal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    exportKey: PropTypes.func.isRequired,
    useExistingKey: PropTypes.func.isRequired,
    export: PropTypes.bool
};


module.exports = EncryptionModal;
