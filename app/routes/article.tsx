import type { Route } from "./+types/article";
import { marked } from "marked";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

const bah = `# Lorem Ipsum
Dolor sit amet, consectetur adipiscing elit. Cras porta tellus maximus magna fermentum, quis cursus est blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim diam ac ante vulputate egestas. Curabitur sit amet libero vel nulla auctor interdum ut non velit. Nullam ullamcorper malesuada dui, non volutpat metus sodales nec. Nulla metus ante, tempor eget arcu a, congue condimentum quam. Nullam aliquam tempor efficitur. In vitae diam eget arcu tincidunt egestas quis sed dui. Aliquam interdum hendrerit quam, vitae condimentum ante pharetra vitae. Aliquam ante nisl, congue ut pellentesque eu, fringilla ac diam. Cras vitae justo orci. Donec ornare eleifend nisi, sit amet mattis odio.

Praesent vel aliquet ex. Pellentesque congue lorem a mattis ultricies. Donec fermentum dui diam, eu sagittis leo venenatis eget. Praesent purus leo, laoreet a ornare eu, venenatis sit amet diam. Nullam in consectetur lectus, et ullamcorper tortor. Pellentesque libero risus, scelerisque non porta sed, luctus at diam. Mauris mollis et arcu vitae tempus. Suspendisse porttitor elementum leo, id ornare tellus. Nam gravida nisi purus, id facilisis elit accumsan et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut eros tellus, porttitor scelerisque elit sed, posuere condimentum lorem. Aliquam quam libero, venenatis congue elit vel, euismod porta elit. Duis nec egestas justo, eget auctor justo. Mauris imperdiet est nec dapibus fermentum. Suspendisse cursus mattis orci nec accumsan. Morbi venenatis tellus nec porta viverra.

Maecenas elit mi, mattis vel rutrum sed, finibus a orci. Nam et odio dolor. Duis vitae posuere odio, eget tristique mauris. In hac habitasse platea dictumst. Pellentesque sollicitudin odio vel ex pulvinar, a dignissim turpis euismod. Donec rhoncus suscipit lacinia. Vivamus commodo viverra nunc, eget porta tellus tempor at. In quis consequat libero, gravida porta felis. Donec aliquet lobortis ligula ut pretium. Ut ultrices libero rutrum felis convallis, sed facilisis dolor faucibus.

Sed vel imperdiet ante. Nulla sit amet egestas nulla, sit amet vehicula massa. Duis eget ultricies libero, tempor semper sem. Sed quis nibh neque. Donec at ligula dictum, mollis orci a, lacinia tellus. Nam a posuere diam. Curabitur venenatis quam molestie, tristique dui auctor, placerat orci. Praesent feugiat, nisi eget volutpat suscipit, purus lorem luctus sem, et vestibulum lorem ante ac nulla. Sed dapibus orci in interdum vulputate. Praesent a tellus in nunc imperdiet consequat sed in sapien. Donec orci leo, lobortis egestas gravida vel, fringilla sed dui. Vivamus semper, lacus vitae tempor varius, arcu turpis scelerisque sem, eu sagittis tortor mauris a odio.

Morbi hendrerit pulvinar consequat. Vivamus quis venenatis ante. Nunc sit amet finibus quam. Aliquam accumsan elementum lectus id malesuada. Nulla ac consectetur tellus. Duis egestas ex id sollicitudin elementum. Vivamus condimentum ipsum magna, eget lacinia nisi scelerisque in. Quisque in nisi lacus. Praesent pulvinar elit ut leo blandit volutpat. Nulla porttitor porttitor elit a dictum. Sed ac feugiat leo. Sed ut gravida tellus.

Vestibulum lobortis ex ac libero venenatis suscipit. Phasellus vestibulum ligula urna, non bibendum turpis hendrerit ut. Ut lectus orci, feugiat non tempus non, porta vitae justo. Vestibulum volutpat nisl eu dui faucibus fermentum. Sed elementum sagittis diam, eget dapibus arcu rutrum nec. Maecenas placerat nunc sed dolor vehicula vehicula a vel lorem. Nulla viverra erat vel aliquet rutrum. Phasellus et lacus at erat accumsan aliquam. Praesent ullamcorper odio ac ex gravida, sagittis aliquam erat posuere. Fusce condimentum eu lacus at ultrices. Nunc sodales quis orci ac blandit. Mauris et leo mattis orci ornare luctus non in libero. Integer nisi eros, dignissim at maximus id, egestas quis ex.

Donec suscipit dolor et fermentum interdum. Fusce ac leo dui. Aenean dapibus posuere auctor. Cras ipsum metus, accumsan nec diam at, condimentum tempus lacus. Aenean fringilla suscipit metus quis ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed maximus maximus vehicula. Vestibulum molestie augue nec leo consectetur, vel ultricies elit accumsan. In hac habitasse platea dictumst. Integer sodales eros augue, at gravida dui condimentum interdum. Curabitur venenatis maximus lectus a feugiat. Phasellus tristique sapien justo, ut suscipit nisi pulvinar id. Ut sed erat nec sem imperdiet consequat. `;

export default function Article({ params }: Route.LoaderArgs) {
  return (
    <div className="Article overflow-y-auto w-full px-50 text-justify space-y-5">
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(bah),
        }}
      />
    </div>
  );
}
