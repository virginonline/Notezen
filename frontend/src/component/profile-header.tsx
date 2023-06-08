interface ProfileHeaderProps {
    heading:string
    text: string
}
export const ProfileHeader = ({heading, text}:ProfileHeaderProps) => {
    return(
        <div>
            <h1 className="font-heading text-center text-3xl md:text-4xl">{heading}</h1>
            {text && <p className="text-lg text-center text-muted-foreground">{text}</p>}
        </div>
    )
}