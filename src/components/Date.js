import dayjs from 'dayjs';

export default function Date(){
    const today = dayjs().format('YYYY/MM/DD');
    const time = dayjs().format('HH:mm');

        return(
            <div>
            <strong> Time:</strong> {time} <strong> Date:</strong>  {today}
            </div>
        )
}