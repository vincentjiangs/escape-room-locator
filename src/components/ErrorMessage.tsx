import * as React from "react";

type Props = {
    errorCode: string
}

function ErrorMessage(props: Props) {
    const { errorCode } = props;

    function getErrorMessage() {
        switch (errorCode) {

        }
    }

    return (
        <div>ErrorMessage</div>
    )
}

export default ErrorMessage